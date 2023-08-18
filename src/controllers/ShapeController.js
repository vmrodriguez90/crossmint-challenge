
class ShapeController {
    constructor(service){
        this.service = service;
    }
    createShape(shape) {
        return this.service.createShape(shape.getConfig());
    }
    deleteShape(shape) {
        let config = shape.getConfigs();
        config[1] = 'DELETE';
        return this.service.deleteShape(config);
    }
}

export default ShapeController;