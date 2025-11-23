import { useEffect } from "react";

declare global {
  interface Window {
    wxOConfiguration: {
      orchestrationID: string;
      hostURL: string;
      rootElementID: string;
      showLauncher: boolean;
      deploymentPlatform: string;
      crn: string;
      chatOptions: {
        agentId: string;
        agentEnvironmentId: string;
      };
    };
    wxoLoader?: {
      init: () => void;
    };
  }
}

interface WatsonxChatProps {
  agentId?: string;
  agentEnvironmentId?: string;
}

export default function WatsonxChat({
  agentId = "69e6d33d-9326-442f-a870-bce64c94adeb",
  agentEnvironmentId = "f997ce1f-ce83-4532-aff5-4e1c670fe810"
}: WatsonxChatProps = {}) {
  useEffect(() => {
    // Clean up existing scripts
    const existingScripts = document.querySelectorAll('script[src*="wxoLoader.js"]');
    existingScripts.forEach(script => script.remove());

    // Configure watsonx Orchestrate
    window.wxOConfiguration = {
      orchestrationID: "dc32db464f4449efb6b4531a37154977_4ef8abfc-f9ba-4be6-a2d3-df876913a154",
      hostURL: "https://eu-gb.watson-orchestrate.cloud.ibm.com",
      rootElementID: "watsonx-chat-root",
      showLauncher: true,
      deploymentPlatform: "ibmcloud",
      crn: "crn:v1:bluemix:public:watsonx-orchestrate:eu-gb:a/dc32db464f4449efb6b4531a37154977:4ef8abfc-f9ba-4be6-a2d3-df876913a154::",
      chatOptions: {
        agentId,
        agentEnvironmentId
      }
    };

    // Load chatbot script
    const loadTimeout = setTimeout(() => {
      const script = document.createElement('script');
      script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`;
      script.async = true;
      script.addEventListener('load', () => {
        if (window.wxoLoader) {
          window.wxoLoader.init();
        }
      });
      document.head.appendChild(script);
    }, 100);

    return () => {
      clearTimeout(loadTimeout);
      const scripts = document.querySelectorAll('script[src*="wxoLoader.js"]');
      scripts.forEach(script => script.remove());
    };
  }, [agentId, agentEnvironmentId]);

  return <div id="watsonx-chat-root" />;
}
