let code = "lass einspluseins:num = rechne 1 + 1;schreib rechne einspluseins * 2";



















































code = code.split(';');
let variables = [];
for (let i = 0;i<code.length;i++) {
    let cmd = code[i].split(' ');
    for (let j = 0;j<cmd.length;j++) {
        if(cmd[j] == 'schreib') {
            let args = getArgs(j,cmd);
            args = isVar(variables,args);
            args = isCalc(args);
            console.log(args.join(' '));
        }else if(cmd[j] == 'lass') {
            let args = getArgs(j,cmd);
            let identifier = args[0];
            if(args[1] == '=') {
                args = isVar(variables,args);
                args = isCalc(args);
                let value = getValue(args).join(' ');
                identifier = identifier.split(':');
                let type = checkType(identifier[1],value);
                identifier = identifier[0];
                let obj = {"name":identifier,"value":value,"type":type};
                variables.push(obj);
            }else {
                console.log('Error!');
                return;
            }
        }
    }
}

function getValue(args) {
    let value = []
    for (let i = 2; i<args.length; i++) {
        value.push(args[i]);
    }
    return value;
}

function getArgs(j,cmd) {
    let args = [];
    for (let k = j + 1;k<cmd.length;k++) {
        args.push(cmd[k]);
    }
    return args;
}

function isVar(variables,args) {
    let oldArgs = args;
    for (let x = 0; x<args.length;x++) {
        for (let y = 0; y<variables.length; y++) {
            if (args[x] == variables[y].name) {
                args[x] = variables[y].value;
            }
        }
    }
    return args;
}

function isCalc(args) {
    for (let x = 0; x<args.length;x++) {
        if (args[x] == 'rechne') {
            let v1 = args[x + 1];
            let op = args[x + 2];
            let v2 = args[x + 3];
            let res = calc(v1,op,v2);

            args.splice(x + 1, 3);
            args[x] = res;
        }
    }
    return args;
}

function calc(v1,op,v2) {
    v1 = parseFloat(v1)
    v2 = parseFloat(v2)
schreib
    if (op == '+') {
        return v1 + v2;
    }else if (op == '-') {
        return v1 - v2;
    }else if (op == '*') {
        return v1 * v2;
    }else if (op == '/') {
        return v1 / v2;
    }
}

function checkType(type,value) {
    if(type == 'str') {
        return 'string';
    }else if(type == 'num') {
        if(!isNaN(value)){
            return 'number';
        }else{
            console.log('TypeError!');
            return;
        }
    }else if(type == 'bool') {
        if(value == 'true' || value == 'false') {
            return 'bool'
        }else{
            console.log('TypeError!')
        }
    }else{
        console.log('TypeError!');
    }
    // if(type == 'arr') return 'array';
}