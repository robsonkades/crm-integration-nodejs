export default interface IWebhook {
  id?: number;
  company_id?: number;
  event_action: string;
  event_object: string;
  subscription_url: string;
}
