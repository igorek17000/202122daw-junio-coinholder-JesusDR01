//Run using: node inlineToStyled.js
//Development file only
try {
  const inputData = `
  width: '100%',
  marginTop: '10px',
  borderRadius: '0.5rem',
  fontSize: '16px',
  fontWeight: '500',
  `;

  const input = createObjectFromString(`{${inputData}}`);
  const output = convertObjectToCustomPropertiesString(input);
  console.log(`\n${output}
  `);
} catch (e) {
  console.log(e);
  console.log('Invalid JS Input');
}

function convertCamelCaseToDashes(str, prefix = '') {
  let s = [...str];
  s.map((l, i) => {
    if (l === l.toUpperCase() && isNaN(l)) {
      s[i] = '-' + l.toLowerCase();
    }
  });
  return `${prefix ? `${prefix}-` : ''}${s.join('')}`;
}

// Poor man's “Object.fromString()” 😅
function createObjectFromString(str) {
  // return eval(`(function () { return ${str}; })()`);
  const fn = new Function(`return ${str};`);
  return fn();
}

function isObject(variable) {
  return Object.prototype.toString.call(variable) === '[object Object]';
}

function convertObjectToCustomPropertiesObject(obj, prefix = '') {
  const toReturn = {};

  Object.entries(obj).map(([key, value]) => {
    const customPropertyName = convertCamelCaseToDashes(key, prefix);
    if (isObject(value)) {
      const flattenedValues = convertObjectToCustomPropertiesObject(value, customPropertyName);
      Object.entries(flattenedValues).map(([fCustomPropertyName, fValue]) => {
        toReturn[`${fCustomPropertyName}`] = fValue;
      });
    } else {
      toReturn[`${customPropertyName}`] = value;
    }
  });

  return toReturn;
}

function convertObjectToCustomPropertiesString(obj, prefix = '') {
  let toReturn = '';

  const asObject = convertObjectToCustomPropertiesObject(obj, prefix);

  for (let [key, value] of Object.entries(asObject)) {
    toReturn += `${key}: ${value};
`;
  }

  return toReturn.trim();
}
