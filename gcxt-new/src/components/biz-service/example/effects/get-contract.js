import { getContractById } from "@services/contract";

export default {
  /**
   * contract_id: payload, value, option
   */
  deps: ["editForm.contract_id"],
  exec: (commit, store) => {
    const contractIds = commit;
    return getContractById(contractIds).then(res => {
      store.contracts = res;
      store.editForm.contract_id.valueObj = contractIds;
    });
  }
};
