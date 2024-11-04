export const allCompanies = (
  Object.keys(localStorage).map(key => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  })
) 


