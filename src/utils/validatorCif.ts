export function isValidSpanishId(id: string): boolean {
    const value = id.toUpperCase().trim();
  
    // NIF: 8 dígitos + letra
    const nifRegex = /^[0-9]{8}[A-Z]$/;
    // CIF: letra + 7 dígitos + letra/dígito
    const cifRegex = /^[ABCDEFGHJKLMNPQRSUVW][0-9]{7}[0-9A-J]$/;
  
    if (nifRegex.test(value)) {
      const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
      const number = parseInt(value.slice(0, 8), 10);
      const expectedLetter = letters[number % 23];
      return value[8] === expectedLetter;
    }
  
    if (cifRegex.test(value)) {
      const digits = value.slice(1, -1);
      const control = value.slice(-1);
      let sumA = 0, sumB = 0;
  
      for (let i = 0; i < digits.length; i++) {
        let n = parseInt(digits[i], 10);
        if (i % 2 === 0) {
          let prod = (n * 2).toString();
          sumA += [...prod].reduce((a, b) => a + parseInt(b), 0);
        } else {
          sumB += n;
        }
      }
  
      const total = sumA + sumB;
      const unit = (10 - (total % 10)) % 10;
  
      const isControlNumber = /^[ABEH]$/.test(value[0]);
      const isControlLetter = /^[KPQS]$/.test(value[0]);
  
      if (isControlNumber) return control === unit.toString();
      if (isControlLetter) return control === 'JABCDEFGHI'[unit];
      return control === unit.toString() || control === 'JABCDEFGHI'[unit];
    }
  
    return false;
  } 