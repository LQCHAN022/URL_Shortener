import { 
        Controller, 
        Body, 
        Get, 
        Param,
        Post,
        Res 
} from '@nestjs/common';
import { UrlService } from './url.service';

@Controller() // "url" removed to handle shortened links (that does not have /url/ in route)
export class UrlController {
    constructor(
        private service: UrlService
    ) {}
}
