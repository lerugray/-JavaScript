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
    GET_ADDRESS_PLUS_ADDRESS_VALUE: 8,
    GET_ADDRESS_MINUS_ADDRESS_VALUE: 9,
    SUB_ADDRESS_FROM_NUMBER_SEND_TO_STACK: 10,
    ADD_ADDRESS_TO_NUMBER_SEND_TO_STACK: 11,
    INCREMENT_ADDRESS: 12,
    DECREMENT_ADDRESS: 13
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

function step() { // this simulates the CPU, as long as it doesn't return an error, in which the sim ends.
    if (er) {
        throw "ERROR. RESET CPU TO CONTINUE.";
    }

    var instr = memory.load(ip);
    switch (instr) {
        case opcodes.MOV_NUM_TO_STACK:
            //read operand one or two numbers
            var input = memory.load(ip+1);
            var value = processResult(checkInput(input));
            memory += value;
            input = memory.load(ip+2);
            value = processResult(checkInput(input));
            memory += value;
            ip += ip+3;
            break;
        case opcodes.DELETE_NUM_FROM_STACK:
            memory.pop();
            ip++;
            break;
        case opcodes.DUPLICATE_LAST_ENTRY:
            memory += memory[memory.length-1];
            ip++;
            break;
        case opcodes.MOV_ADD_TO_STACK:
            var a = memory.load(ip+1);
            var b = memory.load(ip+2);
            value = processResult(checkInput(a+b));
            memory += value;
            ip+=ip+3;
            break;
        case opcodes.MOV_SUB_TO_STACK:
            a = memory.load(ip+1);
            b = memory.load(ip+2);
            value = processResult(checkInput(a-b));
            memory += value;
            ip+=ip+3;
            break;
        case opcodes.ADD_NUM_TO_ADDRESS:
            var inputNumber = memory.load(ip+1);
            var toAddress = memory.load(ip+2);
            value = memory[processResult(checkInput(toAddress))];
            value += processResult(checkInput(inputNumber));
            ip+=3;
            break;
        case opcodes.SUB_NUM_FROM_ADDRESS:
            inputNumber = memory.load(ip+1);
            toAddress = memory.load(ip+2);
            value = memory[processResult(checkInput(toAddress))];
            value -= processResult(checkInput(inputNumber));
            ip+=3;
            break;
        case opcodes.GET_ADDRESS_PLUS_ADDRESS_VALUE: // this will add the addressToAdd value to the ADDRESS specified at the 1st operand
            var addressToModify = memory.load(ip+1);
            var addressToAdd = memory.load(ip+2);
            value = memory[processResult(checkInput(addressToModify))];
            memory[value] += memory[processResult(checkInput(addressToAdd))];
            ip+=3;
            break;
        case opcodes.GET_ADDRESS_MINUS_ADDRESS_VALUE: // this will do the same as above but with subtraction
            addressToModify = memory.load(ip+1);
            var addressToSub = memory.load(ip+2);
            value =  memory[processResult(checkInput(addressToModify))];
            memory[value] -= memory[processResult(checkInput(addressToSub))];
            ip+=3;
            break;
        case opcodes.ADD_ADDRESS_TO_NUMBER_SEND_TO_STACK:
            addressToAdd = memory.load(ip+1);
            var numberToModify = memory.load(ip+2);
            value = processResult(checkInput(numberToModify));
            value += memory[processResult(checkInput(addressToAdd))];
            memory += value;
            ip+=3;
            break;
        case opcodes.SUB_ADDRESS_FROM_NUMBER_SEND_TO_STACK:
            addressToSub = memory.load(ip+1);
            numberToModify = memory.load(ip+1);
            value = processResult(checkInput(numberToModify));
            value -= processResult(checkInput(addressToSub));
            memory += value;
            ip+=3;
            break;
        case opcodes.INCREMENT_ADDRESS:
            addressToModify = memory.load(ip+1);
            value = memory[processResult(checkInput(addressToModify))];
            memory[value]++;
            ip+=2;
            break;
        case opcodes.INCREMENT_ADDRESS:
            addressToModify = memory.load(ip+1);
            value = memory[processResult(checkInput(addressToModify))];
            memory[finalValue]--;
            ip+=2;
            break;
        default:
            throw 'invalid opcode' + instr;
    }

function processResult(value) {
        if (value >= 256) {
            value % 256
        }
        else if (value < 0) {
            value = 255 - (-value) % 256;
        }

        return value
}

function run(code) {
    var code = [];
    var opcode
    var lines = code.split('\n');

    function readOperand(operand) {
        if(operand.startsWith('$')) {
            operand.type = "address";
        }
        else {
            operand.type = "number"
        }
        return operand.type;
    }

    for(var i=0, l=lines.length;i<l;i++) {
        var match = regex.exec(lines[i]);

        if(match[GROUP_OPCODE]) {
            var instr = match[GROUP_OPCODE].toUpperCase();
            switch (instr) {
                case 'ADD':
                    var op1 = readOperand(match[GROUP_OPERAND1]);
                    var op2 = readOperand(match[GROUP_OPERAND2]);

                    if (op1.type === "address" && op2.type === "address")
                        opcode = opcodes.GET_ADDRESS_PLUS_ADDRESS_VALUE;

                    else if (op1.type === "number" && op2.type === "address")
                        opcode = opcodes.ADD_NUM_TO_ADDRESS;


                    else if (op1.type === "address" && op2.type === "number")
                        opcode = opcodes.ADD_ADDRESS_TO_NUMBER_SEND_TO_STACK;


                    else if (op1.type === "number" && op2.type === "number")
                        opcode = opcodes.MOV_ADD_TO_STACK;

                    else
                        throw "ADD does not support these operands.";

                    code.push(opcode, op1.value, op2.value)

                    break;
                }
            }
        }
    }

}
