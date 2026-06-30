import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecommendationService } from './recommendation.service';
import { RecommendationDto } from './dto/recommendation.dto';

@ApiTags('Recommendation')
@Controller('recommendation')
export class RecommendationController {
  constructor(
    private readonly recommendationService: RecommendationService,
  ) {}

  @Post()
  recommend(@Body() body: RecommendationDto) {
    return this.recommendationService.recommend(body.product);
  }
}