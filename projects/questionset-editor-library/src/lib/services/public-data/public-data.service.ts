import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../../services/config/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class PublicDataService extends DataService {

  /**
   * base Url for public api
   */
  baseUrl: string;

  public http: HttpClient;
  constructor(http: HttpClient, apiConfigService: ApiConfigService) {
    super(http, apiConfigService);
    this.baseUrl = 'action/';
  }
}
