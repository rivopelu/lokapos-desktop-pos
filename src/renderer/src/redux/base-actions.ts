import ErrorService from '@renderer/service/error.service';
import { HttpService } from '@renderer/service/http.service';

export default class BaseActions {
  get errorService(): ErrorService {
    return this._errorService;
  }

  get httpService(): HttpService {
    return this._httpService;
  }

  private _httpService: HttpService = new HttpService();
  private _errorService: ErrorService = new ErrorService();
}
