/**
 * Central utility to handle print/download monetization.
 * 
 * Opens the Monetag Direct Link in a new tab immediately (synchronously 
 * to avoid browser popup blockers) and triggers the native print dialog 
 * after a 2-second delay.
 */
export const triggerMonetizedPrint = (): void => {
  const url = 'https://omg10.com/4/11168217';
  
  // Open the Monetag Direct Link in a new tab
  window.open(url, '_blank');
  
  // Wait 2 seconds (2000 milliseconds) and then continue the print/save process
  setTimeout(() => {
    window.print();
  }, 2000);
};
