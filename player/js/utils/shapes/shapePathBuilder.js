var tf1 = [0, 0], tf2 = [0, 0], tf3 = [0, 0], tf4 = [0, 0];

const buildShapeString = function (pathNodes, length, closed, mat) {
  if (length === 0) {
    return '';
  }
  var _o = pathNodes.o;
  var _i = pathNodes.i;
  var _v = pathNodes.v;
  var i;
  mat.applyToPointDavid(_v[0][0], _v[0][1], tf1);
  var shapeString = ' M' + tf1[0] + ',' + tf1[1];
  for (i = 1; i < length; i += 1) {
    mat.applyToPointDavid(_o[i - 1][0], _o[i - 1][1], tf1);
    mat.applyToPointDavid(_i[i][0], _i[i][1], tf2);
    mat.applyToPointDavid(_v[i][0], _v[i][1], tf3);

    /*
    shapeString += ' C';
    shapeString += tf1[0];
    shapeString += ',';
    shapeString += tf1[1];
    shapeString += ' ';
    shapeString += tf2[0];
    shapeString += ',';
    shapeString += tf2[1];
    shapeString += ' ';
    shapeString += tf3[0];
    shapeString += ',';
    shapeString += tf3[1];
    */
    shapeString += ' C' + tf1[0] + ',' + tf1[1] + ' ' + tf2[0] + ',' + tf2[1] + ' ' + tf3[0] + ',' + tf3[1];
  }
  if (closed && length) {
    mat.applyToPointDavid(_o[i - 1][0], _o[i - 1][1], tf1);
    mat.applyToPointDavid(_i[0][0], _i[0][1], tf2);
    mat.applyToPointDavid(_v[0][0], _v[0][1], tf3);

    /*
    shapeString += ' C';
    shapeString += tf1[0];
    shapeString += ',';
    shapeString += tf1[1];
    shapeString += ' ';
    shapeString += tf2[0];
    shapeString += ',';
    shapeString += tf2[1];
    shapeString += ' ';
    shapeString += tf3[0];
    shapeString += ',';
    shapeString += tf3[1];
    shapeString += 'z';
    */
    shapeString += ' C' + tf1[0] + ',' + tf1[1] + ' ' + tf2[0] + ',' + tf2[1] + ' ' + tf3[0] + ',' + tf3[1] + 'z';
  }
  return shapeString;
};


export default buildShapeString;
