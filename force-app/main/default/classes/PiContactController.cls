public with sharing class PiContactController {

    @AuraEnabled
    public static List<String> getJobPicklistOptions(){
        return new List<String>{'programista', 'piekarz', 'akrobata'};
    }

}