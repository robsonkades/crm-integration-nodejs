import IDeal from '@modules/integration/dtos/IDeal';

export default interface ICRMProvider {
  listDeals(): Promise<Array<IDeal>>;
}
