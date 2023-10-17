export class CreateDevsDto {
  readonly id?: number;
  readonly title: string;
  readonly description: string;
  readonly address: string;
  readonly zip_code: string;
  readonly city: string;
  readonly country: string;
  readonly adr: number;
  readonly experience: Date;
  readonly longitude: number;
  readonly latitude: number;
  readonly activity_area: number;
  // readonly availability: string;
  readonly remote: string;
  readonly favorite_techno: string;
  readonly categoryId: number;
  readonly userId: number;
  readonly technoId: Array<number>;
  readonly languageId: Array<number>;
  readonly softSkillId: Array<number>;
  readonly toolId: Array<number>;
}
