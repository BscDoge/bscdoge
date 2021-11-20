let web = '';
let webWiter='';
let wallet_address = '';

async function onConnect() {
    web = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org'));
    try{
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', function (accounts) {
                if(wallet_address!=accounts){
                    location.reload();
                }
            });
            window.ethereum.on('networkChanged', async function (chainId) {
                if(chainId!="56"){
                    await ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x38' }],
                    });
                }else{
                    location.reload();
                }
            });
            let cid = await new Web3(window.ethereum).eth.net.getId()+"";

            if(cid!="56"){
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }],
                });
                return;
            }
            let accounts = await window.ethereum.request({method:'eth_requestAccounts'});
            webWiter = new Web3(window.ethereum);
            wallet_address = accounts[0];
            let str_a =wallet_address.substr(0, 5);
            let str_b = wallet_address.substr(wallet_address.length - 5);
            setTimeout(() => {
                document.getElementById("showAddress").innerHTML = str_a + "..." + str_b;
                // changeAddr();
            }, 1000);

        }
    }catch(e){

    }
}

function changeAddr(){
    getBalance();
    getStocks();
    getUnpaidEarnings();
    getTotalRewards();
}

async function getBalance() {
    let contract = new web.eth.Contract(balance_abi, token_address);
    let res = await contract.methods.balanceOf(wallet_address).call();
    document.getElementById("balanceBsd").innerHTML = mathFixed(mathDiv(res, mathPow(10, 9)), 3);
}

async function getStocks() {
    let contract = new web.eth.Contract(contract_abi,contract_addr);
    let res = await contract.methods.stocks(wallet_address).call();
    document.getElementById("totalEarned").innerHTML = mathFixed(mathDiv(res[2], this.mathPow(10, 18)),3) + ' BUSD';
}

async function getUnpaidEarnings() {
    let contract = new web.eth.Contract(contract_abi,contract_addr);
    let res = await contract.methods.getUnpaidEarnings(wallet_address).call();
    document.getElementById("unpaidEarnings").innerHTML = mathFixed(mathDiv(res, this.mathPow(10, 18)),3) + ' BUSD';
}
async function getTotalRewards() {
    let contract = new web.eth.Contract(contract_abi,contract_addr);
    let res = await contract.methods.totalRewards().call();
    document.getElementById("totalRewards").innerHTML = mathFixed(mathDiv(res, this.mathPow(10, 18)),3) + ' BUSD';
}

async function claimReward() {
    // if(!wallet_address) alert('Please, Connect your wallet!');
    // let contract = new webWiter.eth.Contract(contract_abi,contract_addr);
    // contract.methods.claimReward().send({from: wallet_address});
}

function mathDiv(a,b){
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    if(y==0 || x==NaN || y==NaN)return 0;
    return x.dividedBy(y);
}

function mathMul(a,b){
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    if(x==NaN || y==NaN)return 0;
    return x.multipliedBy(y);
}

function mathPow(a,b){
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    if(x==NaN || y==NaN)return 0;
    return x.exponentiatedBy(y);
}

function mathFixed(val,decimals) {
    let x = new BigNumber(val);
    if(x==NaN)return 0;
    return x.toFixed(decimals,1);
}

window.onload = function(){
    onConnect();
}