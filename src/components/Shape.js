class Shape  {
    SHAPES = {
        "POLYANET": "🪐",
        "SOLOON": "🌕",
        "COMETH": "☄️",
        "SPACE": "🌌"
    };
    
    constructor(symbol, row, column) {
      this.symbol = this.SHAPES[symbol] || this.SHAPES.SPACE;
      this.row = row;
      this.column = column;
    }
    getConfig() {
        const { row, column } = this;
        return ['/polyanets', 'POST', { row, column }]
    }

    render() {
        return (<span key={this.row+this.column} >{this.symbol}</span>);
    }
}
  
class ColoredShape extends Shape {
    COLORS = {
        blue: {filter: "grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8)"},
        purple: {filter: "grayscale(100%) brightness(70%) sepia(50%) hue-rotate(-100deg) saturate(500%) contrast(1)"},
        red: {filter: "grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)"},
        white: {filter: "grayscale(100%)"}  
    };
    constructor(symbol, color, row, column) {
      super(symbol, row, column);
      this.color = color.toLowerCase();
    }

    getConfig() {
        const { row, column, color } = this;
        return ['/soloons', 'POST', { row, column, color }]
    }

    render() {
      return (<span key={this.row+this.column} style={this.COLORS[this.color] || this.COLORS.white}>{this.symbol}</span>);
    }
}
  
  class DirectionalShape extends Shape {
    DIRECTIONS = {
        up: "140deg",
        down: "330deg",
        left: "48deg",
        right: "230deg"  
    };

    constructor(symbol, direction, row, column) {
        super(symbol, row, column);
        this.direction = direction.toLowerCase();
    }
  
    getConfig() {
        const { row, column, direction } = this;
        return ['/comeths', 'POST', { row, column, direction }]
    }

    render() {
      return (<span key={this.row+this.column} style={{display: 'inline-block',
                         transform: `rotate(${this.DIRECTIONS[this.direction.toLowerCase()]})` 
                        }}>{this.symbol}</span>);
    }
}

class ShapeFactory { 
    getShape(value, row = 0, column = 0) {
        if(value.split('_').length > 1) {
            if (['up', 'down', 'left', 'right'].indexOf(value.split('_')[0].toLowerCase())!==-1) {
                // console.log(`VALUE:  ${value} SHAPE: comet [${row}:${column}]`);
                return new DirectionalShape(value.split('_')[1],value.split('_')[0], row, column);
            } else if(['red', 'blue', 'purple', 'white'].indexOf(value.split('_')[0].toLowerCase())!==-1) {
                // console.log(`VALUE:  ${value} SHAPE: moon [${row}:${column}]`);
                return new ColoredShape(value.split('_')[1],value.split('_')[0], row, column);
            }
        }
        // console.log(`VALUE:  ${value} SHAPE: planet [${row}:${column}]`);
        return new Shape(value, row, column);
    }

    containsShape(row) {
        if(row.indexOf('POLYANET') !== -1 
        || row.indexOf('SOLOON') !== -1
        || row.indexOf('COMETH') !== -1)
            return true;
        return false;
    }
}

export {ShapeFactory, Shape, DirectionalShape, ColoredShape};