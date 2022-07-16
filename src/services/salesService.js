import { ProviderRpcClient, Address } from "everscale-inpage-provider";
import axios from "axios";
import Sale from "../abis/Sale.abi.json";
import NftAbi from '../abis/Nft.abi.json'

const SALE_CODE_HASH =
  "82cb7e5822f1e290654153168a948b13f129524d4b13bdf377daf09468f4d549";

async function getAllSales(rpc) {
  const hexString = SALE_CODE_HASH;
  console.log(hexString);
  const queryString = ` 
    query { accounts (filter : {
        code_hash :{eq : "${hexString}"}
    })
    {
        id
    }}
    `;
  const response = await axios({
    url: "https://net.ton.dev/graphql",
    method: "post",
    data: {
      query: queryString,
    },
  });
  const promises = [];
  response.data.data.accounts.forEach((item) => {
    const contractAddress = new Address(item.id);
    const contract = rpc.createContract(Sale, contractAddress);
    promises.push(contract);
  });
  let contracts, contractCalls;
  await Promise.allSettled(promises).then((results) => {
    contracts = results;
    contractCalls = results.map((contract) => {
      return contract.value.methods
        .getPrices({
          answerId: 0,
        })
        .call();
    });
  });

  const sale = [];
  await Promise.allSettled(contractCalls).then((results) => {
    results.forEach((item, index) =>
      item.value.value0.forEach((v) => {
        let nft= await rpc.createContract(NftAbi,v)
        let resGetJson = await nft.value.methods.getJson.({
            answerId: 0,
          })
          .call()
        sale.push({ sale: contracts[index], json: v });
      })
    );
  });
  return sale;
}

export { getAllSales };
