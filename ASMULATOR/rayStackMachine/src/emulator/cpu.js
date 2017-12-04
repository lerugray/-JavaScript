//cpu for Stack Machine

var ip, sp, er; //instruction pointer, stack pointer, error

function reset() {
    self = this ;
    self.ip = 0 ;
    self.sp = 0 ;
    self.er = 0 ;
}

function step() {
   if (er) {
       throw "ERROR. RESET CPU TO CONTINUE.";
   }

   var instr = memory.load(ip);
   switch(instr) {
       case opcodes.MOV_NUM_TO_STACK:
           //read operand one, first number
           var input = memory.load(ip+1);
           //execute instruction
   }
};