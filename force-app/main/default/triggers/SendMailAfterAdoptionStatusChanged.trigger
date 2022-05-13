trigger SendMailAfterAdoptionStatusChanged on Adoption__c (after update) {
    
    Set<Id> adoptionsId = new Set<Id>();
    
    for(Id adoptionId : Trigger.newMap.keySet()){
        if(Trigger.oldMap.get(adoptionId).Status__c != Trigger.newMap.get(adoptionId).Status__c){
            adoptionsId.add(adoptionId);
        }
    }
    
    if(!adoptionsId.isEmpty()){
        List<Adoption__c> adoptions = [SELECT Id, Status__c, Contact__r.Email, Contact__r.FirstName, Contact__r.LastName, Contact__r.Id, Animal__r.Name FROM Adoption__c WHERE Id IN :adoptionsId];
    
        for (Adoption__c adoption : adoptions){
            Contact contact = adoption.Contact__r;
            Animal__c animal = adoption.Animal__r;
            EmailManager.sendMail(contact.Email, 'Status of your adoption has changed',
                    '<html><body>Good Morning ' + contact.FirstName + ' ' + contact.LastName + '<br>Status of your adoption for your animal ' + animal.Name + ' has changed to ' + adoption.Status__c + '.</body></html>');
    	}
    }
    
    

}