public class EmailManager {

    public static Boolean sendEmail(String address, String topic, String email){
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.setToAddresses(new String[] { address });
        message.setSubject(topic);
        message.setPlainTextBody(email);
        
        Messaging.SendEmailResult[] results = Messaging.sendEmail(
            new List<Messaging.SingleEmailMessage> {message});
        return results[0].success;
    }
}