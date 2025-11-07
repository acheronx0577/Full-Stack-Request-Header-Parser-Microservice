// public/script.js - FRONTEND JavaScript
console.log("✅ script.js loaded from public folder");

document.addEventListener('DOMContentLoaded', function() {
    console.log("🎯 DOM loaded - setting up button listeners");
    
    let requestCount = 0;
    
    // Get buttons
    const whoamiBtn = document.getElementById('test-whoami');
    const headersBtn = document.getElementById('test-headers');
    const outputPanel = document.getElementById('output');
    const jsonContent = document.getElementById('json-content');
    const outputStatus = document.getElementById('output-status');
    
    console.log("🔍 Elements found:", {
        whoamiBtn: !!whoamiBtn,
        headersBtn: !!headersBtn,
        outputPanel: !!outputPanel,
        jsonContent: !!jsonContent,
        outputStatus: !!outputStatus
    });
    
    // Function to call API and display results
    async function testEndpoint(endpoint) {
        console.log(`🚀 Calling API: ${endpoint}`);
        
        // Show loading state
        outputStatus.textContent = 'LOADING...';
        outputStatus.style.color = 'var(--accent-warning)';
        jsonContent.textContent = '// Fetching data...';
        
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            
            // Display the result
            jsonContent.textContent = JSON.stringify(data, null, 2);
            outputStatus.textContent = 'SUCCESS';
            outputStatus.style.color = 'var(--accent-success)';
            
            // Update counter
            requestCount++;
            document.getElementById('request-count').textContent = requestCount;
            
            console.log("✅ API call successful");
            
        } catch (error) {
            console.error("❌ API call failed:", error);
            jsonContent.textContent = `// Error: ${error.message}`;
            outputStatus.textContent = 'ERROR';
            outputStatus.style.color = 'var(--accent-error)';
        }
    }
    
    // Add event listeners
    if (whoamiBtn) {
        whoamiBtn.addEventListener('click', function() {
            console.log("🖱️ Whoami button clicked");
            testEndpoint('/api/whoami');
        });
    }
    
    if (headersBtn) {
        headersBtn.addEventListener('click', function() {
            console.log("🖱️ Headers button clicked");
            testEndpoint('/api/headers');
        });
    }
    
    console.log("🎉 Button listeners setup complete");
});