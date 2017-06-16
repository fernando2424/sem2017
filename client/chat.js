Template.chat.events(
    {
        "submit form":function(){
            var msg=$("#textchat").val();
            CHAT.insert({autor:"anonymus",msg:msg});
            console.log(msg);
            $("#textchat").val("");
            return false;
        }
    }
);
Template.chat.helpers(
    {
        chat:function(){
            return CHAT.find();
        }
    }
);
