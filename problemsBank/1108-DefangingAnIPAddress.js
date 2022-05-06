// 1108. Defanging an IP Address
// https://leetcode.com/problems/defanging-an-ip-address/
/**
 * @param {string} address
 * @return {string}
 */

var defangIPaddr = function(address) {
    let target = /\./g
    return address.replace(target,"[.]")
};