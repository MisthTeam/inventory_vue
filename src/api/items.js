export default function (instance) {
    return {
        get() {
            return instance.get('/items/get');
        },
    };
}
