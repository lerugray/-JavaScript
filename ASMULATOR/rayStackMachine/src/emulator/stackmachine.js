//stack machine by ray weiss

var opcodes = {
    NONE: 0,
    MOV_NUM_TO_STACK: 1,
    DELETE_NUM_FROM_STACK: 2,
    MOV_SUB_TO_STACK: 3,
    MOV_ADD_TO_STACK: 4,
    DUPLICATE_LAST_ENTRY: 5,
    ADD_NUM_TO_ADDRESS: 6,
    SUB_NUM_FROM_ADDRESS: 7,
    GET_ADDRESS_PLUS_ADDRESS: 8,
    GET_ADDRESS_MINUS_ADDRESS: 9,
    SUB_ADDRESS_FROM_NUMBER_SEND_TO_STACK: 10,
    ADD_ADDRESS_TO_NUMBER_SEND_TO_STACK: 11,
    INCREMENT_ADDRESS: 12,
    DECREMENT_ADDRESS: 13,
};

// Matches: "label: INSTRUCTION (["')OPERAND1(]"'), (["')OPERAND2(]"')
// GROUPS:      1       2               3                    7
var regex = /^[\t ]*(?:([.A-Za-z]\w*)[:])?(?:[\t ]*([A-Za-z]{2,4})(?:[\t ]+(\[(\w+((\+|-)\d+)?)\]|\".+?\"|\'.+?\'|[.A-Za-z0-9]\w*)(?:[\t ]*[,][\t ]*(\[(\w+((\+|-)\d+)?)\]|\".+?\"|\'.+?\'|[.A-Za-z0-9]\w*))?)?)?/;

// Regex group indexes
var GROUP_LABEL = 1;
var GROUP_OPCODE = 2;
var GROUP_OPERAND1 = 3;
var GROUP_OPERAND2 = 7;

var ip, sp, er; //instruction pointer, stack pointer, error

var memory = Array(256);

function load(address) {
    if(address < 0 || address >= memory.length) {
        throw 'Memory access violation. Address: ' + address;
    }
    return memory[address];
}

function store(address, value) {
    if(address < 0 || address >= memory.length) {
        throw 'Memory access violation. Address: ' + address;
    }
    memory[address] = value;
}

function reset() {
    ip = 0 ;
    minSP = 0 ;
    er = false ;
    maxSP = 255 ;
    sp = this.maxSP ;
    for(var i=0;i<memory.length; i++) {
        memory[i] = 0;
    }
}

function checkInput(input) {
    //read input
    input = memory.load(ip+1) ;
    //check if input is not a number
    if(isNaN(input)) {
        console.log(er + 'is not a number!') ;
        er = true ;
        return er ;
    }
}

function step() {
    if (er) {
        throw "ERROR. RESET CPU TO CONTINUE.";
    }

    var instr = memory.load(ip);
    switch (instr) {
        case opcodes.MOV_NUM_TO_STACK:
            //read operand one or two numbers
            var input = memory.load(ip+1);
            var inputTwo = memory.load(ip+2);
            //execute instruction
            var value = checkInput(input);
            var valueTwo = checkInput(inputTwo);
            //moving value to the stack
            stack += value;
            stack += valueTwo;
            //updating instruction pointer
            ip += ip+3;
            break;
        case opcodes.DELETE_NUM_FROM_STACK:
            stack.pop();
            ip++;
            break;
        case opcodes.DUPLICATE_LAST_ENTRY:
            stack += stack[stack.length-1];
            ip++;
            break;
        case opcodes.MOV_ADD_TO_STACK:
            var a = memory.load(ip+1);
            var b = memory.load(ip+2);
            value = checkInput(a+b);
            stack += value;
            ip+=ip+3;
            break;
        case opcodes.MOV_SUB_TO_STACK:
            a = memory.load(ip+1);
            b = memory.load(ip+2);
            value = checkInput(a-b);
            stack += value;
            ip+=ip+3;
            break;
        default:
            throw 'invalid opcode' + instr;
    }

function run(code) {
    var code = [];
    var opCode;
    var lines = code.split('\n');

    for(var i=0,l=lines.length;i<l;i++) {
        var match = regex.exec(lines[i]);

        if (match[GROUP_OPCODE]) {
            var instr = match[GROUP_OPCODE].toUpperCase();
            switch (instr) {
                case 'ADD':
                    var input = memory.load(ip+1);
                    var op1 = input.match[GROUP_OPERAND1];
                    var inputTwo = memory.load(ip+2);
                    var op2 = inputTwo.match[GROUP_OPERAND2];


            }
        }
    }
}

}
