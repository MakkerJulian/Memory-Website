import { Provider } from '@angular/core';

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor';

/** Provider for the Noop Interceptor. */
export const InterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true };