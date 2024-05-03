function write(val) {
    try {
        ggbApplet.evalCommand(val);
    } catch {
        try {
            alert(val);
        } catch {
            console.log(val);
        }
    }
}

var points = [
    ["a", "-1", "1", "1"],
    ["b", "1", "1", "1"],
    ["c", "-1", "-1", "1"],
    ["d", "1", "-1", "1"],
    ["e", "-1", "1", "4"],
    ["f", "1", "1", "4"],
    ["g", "-1", "-1", "4"],
    ["h", "1", "-1", "4"],
];

var lines = [
    ["La", "a", "b"],
    ["Lb", "b", "d"],
    ["Lc", "d", "c"],
    ["Ld", "c", "a"],
    ["Le", "a", "e"],
    ["Lf", "b", "f"],
    ["Lg", "c", "g"],
    ["Lh", "d", "h"],
    ["Li", "e", "f"],
    ["Lj", "f", "h"],
    ["Lk", "h", "g"],
    ["Lm", "g", "e"]
];

//a b c d e f g h i j k l m n o p q r s t u v w x y z

var D = 30;

write(`Pd(Pa,Pz)=(Pa)/(Pz/D+1)`); //equation that renders points in perspective

function comprimento(x, y) {
    return `sqrt((${x})^(2)+(${y})^(2))`;
}

function arcCos(x, c) {
    return `arccos(${x}/${c})`;
}

function arcSen(y, c) {
    return `arcsen(${y}/${c})`;
}

function render_rot_point(x, y) {
    var c = comprimento(x, y);
    var xd = arcCos(x, c);
    var yd = arcSen(y, c);
    return [`${c} * cos(${xd}+An)`, `${c} * sen(${yd}+An)`];
}

var idx = 0;

function renderPoint(X, Y, z) {
    if (idx < 4) {
        return `Pd(${X}+X-Sx,${z}+Z),Pd(${Y}+Y-Sy,${z}+Z)`;
    } else {
        return `Pd(${X}+X+Sx,${z}+Z),Pd(${Y}+Y+Sy,${z}+Z)`;
    }
}

function create_point(name,x,y,z) {
    if (idx < 4) {
    write(`Object${name}=Point({${x},${y}+Y-Sy,${z}+Z})`);
    } else {
    write(`Object${name}=Point({${x},${y}+Y+Sy,${z}+Z})`); 
    } 
}

write('An=0')
write(`D=${D}`);

write(`PontoFocal=Point({0,0,-D})`)

write('X=0');
write('Y=0');
write('Z=10');

write('Sx=0');
write('Sy=0');

points.forEach((point, i) => {
    idx = i;
    var rot_point = render_rot_point(point[1], point[3]);
    create_point(point[0],rot_point[0],point[2],rot_point[1]);
    write(
        `${point[0]}=Point({${renderPoint(rot_point[0], point[2], rot_point[1])}})`
    );
    write(`Line${point[0]}=Segment(Object${point[0]},PontoFocal)`)
});

lines.forEach((item, idx) => {
    write(`Object${item[0]}=Segment(Object${item[1]},Object${item[2]})`);
    write(`${item[0]}=Segment(${item[1]},${item[2]})`);
});