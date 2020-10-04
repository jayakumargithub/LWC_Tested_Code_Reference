public with sharing class UserService {
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts(string accountName) {
    List<Contact> result;
    if (String.isEmpty(accountName)) {
      result = [
        SELECT Id, firstName, lastName, phone, email
        FROM Contact
        LIMIT 10
      ];
    } else {
      result = [
        SELECT Id, firstName, lastName, phone, email
        FROM Contact
        WHERE Account.Name = :accountName
      ];
    }

    system.debug(result);
    return result;
  }

  @AuraEnabled(cacheable=true)
  public static List<Contact> getRelatedContacts(Id accountId) {
    return [SELECT Id, Name, Phone, Email FROM Contact WHERE AccountId = :accountId];
  }
}
