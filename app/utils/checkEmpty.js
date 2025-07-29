
function checkEmpty(data) {
  if (data === undefined || data === "" ) {
    return true;
  }

  return false;
}



module.exports = checkEmpty;