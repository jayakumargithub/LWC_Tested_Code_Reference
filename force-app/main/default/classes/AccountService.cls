public with sharing class AccountService {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts() {
    List<Account> accList = [
      SELECT Id, Name, AnnualRevenue
      FROM Account
      LIMIT 10
    ];
    system.debug(accList);
    return accList;
  }
}
