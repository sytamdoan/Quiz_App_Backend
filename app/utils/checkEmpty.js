
function checkEmpty(data) {
  if (data === undefined || data === "" || data === null) {
    return true;
  }

  return false;
}



module.exports = checkEmpty;