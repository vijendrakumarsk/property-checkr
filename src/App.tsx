import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/Home";
import { SupportPage } from "@/pages/Support";
import { FAQPage } from "@/pages/FAQ";
import { PrivacyPage } from "@/pages/Privacy";
import { NotFoundPage } from "@/pages/NotFound";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/support" component={SupportPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
