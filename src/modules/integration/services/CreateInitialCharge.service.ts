import pipedrive, { Deal } from '../providers/pipedrive';

class CreateInitialChargeService {
  async execute(): Promise<Deal[]> {
    return pipedrive.listDeals();
  }
}

export default new CreateInitialChargeService();
