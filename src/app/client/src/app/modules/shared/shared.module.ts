import { SuiSelectModule, SuiModalModule, SuiAccordionModule, SuiPopupModule, SuiDropdownModule,
  SuiProgressModule, SuiRatingModule, SuiCollapseModule } from 'ng2-semantic-ui';
import { SlickModule } from 'ngx-slick';
import { FormsModule } from '@angular/forms';
import {
  AnnouncementInboxCardComponent, PageSectionComponent, NoResultComponent, AppLoaderComponent, CardComponent,
  CardCreationComponent, ShareLinkComponent, BrowserCompatibilityComponent, QrCodeModalComponent, RedirectComponent,
  CustomMultiSelectComponent, InstallAppComponent, LockInfoPopupComponent, BatchCardComponent
} from './components';
import {
  ConfigService, ResourceService, ToasterService, WindowScrollService, BrowserCacheTtlService,
  PaginationService, RouterNavigationService, NavigationHelperService, UtilService, ContentUtilsServiceService, ExternalUrlPreviewService
} from './services';
import { ContentDirectionDirective } from './directives';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { DateFormatPipe, DateFilterXtimeAgoPipe, FilterPipe, InterpolatePipe } from './pipes';
import { CacheService } from 'ng2-cache-service';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TelemetryModule } from '@sunbird/telemetry';
import { CdnprefixPipe } from './pipes/cdnprefix.pipe';


@NgModule({
  imports: [
    CommonModule,
    SuiSelectModule, SuiModalModule, SuiAccordionModule, SuiPopupModule, SuiDropdownModule, SuiProgressModule,
    SuiRatingModule, SuiCollapseModule,
    SlickModule,
    FormsModule,
    TelemetryModule
  ],
  declarations: [AppLoaderComponent, AnnouncementInboxCardComponent, DateFormatPipe, PageSectionComponent,
    BatchCardComponent, NoResultComponent, DateFilterXtimeAgoPipe, CardComponent, CardCreationComponent, FilterPipe, InterpolatePipe,
    ShareLinkComponent, BrowserCompatibilityComponent, QrCodeModalComponent, CdnprefixPipe, RedirectComponent, CustomMultiSelectComponent,
    InstallAppComponent, LockInfoPopupComponent, ContentDirectionDirective],
  exports: [AppLoaderComponent, AnnouncementInboxCardComponent, DateFormatPipe, DateFilterXtimeAgoPipe,
    PageSectionComponent, BatchCardComponent, NoResultComponent, CardComponent, CardCreationComponent, FilterPipe,
    ShareLinkComponent, BrowserCompatibilityComponent, QrCodeModalComponent, CdnprefixPipe, InterpolatePipe, RedirectComponent,
    CustomMultiSelectComponent, InstallAppComponent, LockInfoPopupComponent, ContentDirectionDirective]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ResourceService, ConfigService, ToasterService, PaginationService,
        RouterNavigationService, WindowScrollService, NavigationHelperService, CacheService, UtilService, ContentUtilsServiceService,
        DeviceDetectorModule, DeviceDetectorService, BrowserCacheTtlService, ExternalUrlPreviewService]
    };
  }
}
