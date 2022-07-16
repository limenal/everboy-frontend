import { ProviderRpcClient, Address } from "everscale-inpage-provider";
import axios from "axios";
import Sale from "../abis/Sale.abi.json";
import NftAbi from '../abis/Nft.abi.json'

const SALE_CODE_HASH =
  "82cb7e5822f1e290654153168a948b13f129524d4b13bdf377daf09468f4d549";

async function getAllSales(rpc,account) {
  const hexString = SALE_CODE_HASH;
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
  await Promise.allSettled(contractCalls).then(async(results) => {
    results.forEach(async (item, index) =>
      item.value.value0.forEach(async(v) => {
        let nft = await rpc.createContract(NftAbi,v[0])

        let resGetJson = await nft.methods.getJson({
            answerId: 0,
          })
          .call()

        console.log( (Number.parseInt('100000000') + Number.parseInt(v[1])).toString())
        const buy =  async()=>{
            console.log(v[0])
            await contracts[index].value.methods.buy({
                nft: v[0]
              }).send({
                from: account.address,
                bounce: true,
                amount: v[1]
              })
        }
        let result= {
           ...JSON.parse(resGetJson.json.replaceAll('\'','\"')),
            price: v[1]/(1000000000),
            sale :contracts[index],
            buy: buy
          }
        result = {
            ...result,
            pictureSrc:result.pic
          }
        result.pic=undefined;
        sale.push(result);
      })
    );
  });
  return sale;
}

export { getAllSales };
