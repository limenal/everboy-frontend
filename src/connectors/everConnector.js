import {
    ProviderRpcClient
  } from 'everscale-inpage-provider'
  // import account from '@/store/modules/account'
  
class everConn {
    static ever = new ProviderRpcClient()
    isConnected = false
    // static accountInter = parseAccountInteraction('address');
    static async connectToEverWallet () {
      console.log('start')

      if (!(await everConn.ever.hasProvider())) {
        throw new Error('Extension is not installed')
      }
      await everConn.ever.ensureInitialized()

      const { accountInteraction } = await everConn.ever.requestPermissions({
        permissions: ['basic', 'accountInteraction']
      })

      if (accountInteraction == null) {
        throw new Error('Insufficient permissions')
      }

      // const selectedAddress = accountInteraction.address
      this.accountInter = accountInteraction.address
      return [everConn.ever, accountInteraction]
    }

    // static async getContractState () {
    //   console.log(await everConn.ever.getFullContractState())
    // }

    static async getAddrt () {
      return this.accountInter
    }

    // static async getBallanse(){
    //   await everConn.ever.data.balance
    // }

    static async disconnectToEverWallet () {
      await everConn.ever.disconnect()
    }
}

export default everConn