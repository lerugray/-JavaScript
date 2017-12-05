function(context, args)
{
 
var banner =`
   ▄   ██   █ ▄▄  ████▄ █     ▄███▄   ████▄    ▄       ▄█ ▄█ ▄█     
    █  █ █  █   █ █   █ █     █▀   ▀  █   █     █      ██ ██ ██     
██   █ █▄▄█ █▀▀▀  █   █ █     ██▄▄    █   █ ██   █     ██ ██ ██     
█ █  █ █  █ █     ▀████ ███▄  █▄   ▄▀ ▀████ █ █  █     ▐█ ▐█ ▐█     
█  █ █    █  █              ▀ ▀███▀         █  █ █      ▐  ▐  ▐     
█   ██   █    ▀                             █   ██                  
        ▀`
 var adOne ="`NTired of having to solve t1 locks manually?` Just use napoleon_iii.t1_unlocker{target:#s.npc.loc} We only take 10% off the top!" 

 var chamberPot = "`FNous sommes dans un pot de chambre, et nous y serons emmerdés` - `TAuguste-Alexandre Ducrot - 1870`"

 var hello_world = banner + "\n" + adOne + "\n" + chamberPot

return #fs.chats.send({channel:"0000", msg:hello_world})

}
