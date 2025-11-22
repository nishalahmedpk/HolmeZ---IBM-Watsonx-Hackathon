// Intercept watsonx chatbot API calls and dispatch data to frontend
(function() {
  console.log('🤖 Chatbot interceptor loaded');
  
  const originalFetch = window.fetch;
  
  window.fetch = function(...args) {
    const [url, options] = args;
    
    // Intercept generate-report calls from chatbot
    if (url && url.includes('/api/sales/generate-report')) {
      console.log('🎯 Intercepted chatbot report request:', url);
      
      return originalFetch.apply(this, args).then(response => {
        const clonedResponse = response.clone();
        
        clonedResponse.json().then(data => {
          console.log('📊 Chatbot report data received:', data);
          
          const event = new CustomEvent('watsonx-report-data', {
            detail: data,
            bubbles: true
          });
          window.dispatchEvent(event);
          console.log('✅ Dispatched watsonx-report-data event');
        }).catch(err => {
          console.error('❌ Error parsing chatbot response:', err);
        });
        
        return response;
      });
    }
    
    // Intercept create-order calls from chatbot
    if (url && url.includes('/api/orders/create')) {
      console.log('🎯 Intercepted chatbot order request:', url);
      
      return originalFetch.apply(this, args).then(response => {
        const clonedResponse = response.clone();
        
        clonedResponse.json().then(data => {
          console.log('📦 Chatbot order data received:', data);
          
          const event = new CustomEvent('watsonx-order-created', {
            detail: data,
            bubbles: true
          });
          window.dispatchEvent(event);
          console.log('✅ Dispatched watsonx-order-created event');
        }).catch(err => {
          console.error('❌ Error parsing chatbot response:', err);
        });
        
        return response;
      });
    }
    
    return originalFetch.apply(this, args);
  };
})();
