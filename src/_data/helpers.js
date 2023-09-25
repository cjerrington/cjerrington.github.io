module.exports = {
  currentYear() {
    const today = new Date();
    return today.getFullYear();
  },
  buildTime() { 
    const today = new Date().toLocaleString();
    return today;
  }
};