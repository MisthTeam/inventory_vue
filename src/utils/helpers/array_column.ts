export default function array_column(input: any, ColumnKey: string | number, IndexKey: null | string = null) {
  // discuss at: https://locutus.io/php/array_column/
  if (input !== null && (typeof input === "object" || Array.isArray(input))) {
    const newarray = [];
    if (typeof input === "object") {
      const temparray = [];
      for (const key of Object.keys(input)) {
        temparray.push(input[key]);
      }
      input = temparray;
    }
    if (Array.isArray(input)) {
      for (const key of input.keys()) {
        if (IndexKey && input[key][IndexKey]) {
          if (ColumnKey) {
            newarray[input[key][IndexKey]] = {
              [ColumnKey]: input[key][ColumnKey],
            };
          } else {
            newarray[input[key][IndexKey]] = input[key];
          }
        } else {
          if (ColumnKey) {
            newarray.push(input[key][ColumnKey]);
          } else {
            newarray.push(input[key]);
          }
        }
      }
    }
    return Object.assign({}, newarray);
  }
}
