import IDeal from './IDeal';

export default interface IPipedriveResponse {
  data: Array<IDeal>;
  additional_data: {
    pagination: {
      start: number;
      limit: number;
      more_items_in_collection: boolean;
      next_start: number;
    };
  };
}
