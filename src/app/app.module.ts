//Angular / Ionic
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
  //for user settings
import { Storage, IonicStorageModule } from '@ionic/storage';
  //i18n
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//Pages
import { MyApp } from './app.component';
import { PrivacyPolicyPage } from '../pages/legal/privacy-policy/privacy-policy';
import { TermsOfServicePage } from '../pages/legal/terms-of-service/terms-of-service';
import { TutorialPage } from './../pages/tutorial/tutorial';
import { ChangeSchoolPage } from '../pages/choose-school/change-school';
import { SchoolListPage } from '../pages/choose-school/school-list/school-list';
import { TabsPage } from './../pages/tabs/tabs';
import { HelpPage } from './../pages/help/help';
import { ResourceList } from './../pages/resources-list/resource-list';
import { JustAssaultedPage } from '../pages/resources-list/just-assaulted/just-assaulted';
import { HospitalPage } from './../pages/resources-list/hospital/hostpital';
import { PoliceStationPage } from './../pages/resources-list/police-station/police-station';
import { OnCampusHelpPage } from './../pages/resources-list/on-campus-help/on-campus-help';
import { CounselingPage } from './../pages/resources-list/counseling/counseling';
import { QuestionAnswerList} from './../pages/question-answer-list/question-answer-list';
import { QuestionDetailPage } from './../pages/question-answer-list/question-detail/question-detail';
import { SearchPage } from './../pages/question-answer-list/search/search';
import { SettingsPage } from './../pages/settings/settings';

//Services
import { Api } from '../providers/api';
import { Questions } from './../providers/questions'
import { Settings } from '../providers/settings';
import { NativeDeviceFeatures } from './../providers/native-device-features';

let pages = [
  MyApp,
  PrivacyPolicyPage,
  TermsOfServicePage,
  TutorialPage,
  ChangeSchoolPage,
  SchoolListPage,
  TabsPage,
  HelpPage,
  ResourceList,
  JustAssaultedPage,
  HospitalPage,
  PoliceStationPage,
  OnCampusHelpPage,
  CounselingPage,
  QuestionAnswerList,
  QuestionDetailPage,
  SearchPage,
  SettingsPage
]

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: [
    StatusBar,
    SplashScreen,
    Api,
    NativeDeviceFeatures,
    Questions,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})

export class AppModule {}

// The translate loader needs to know where to load i18n files in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// For default settings ; very first time app is opened
export function provideSettings(storage: Storage) {
  return new Settings(storage, {
    enableIntroPage: true,
    school: {
      name: "UMass: Dartmouth",
      logo: "assets/img/umd_logo_square.png"
    }
  });
}