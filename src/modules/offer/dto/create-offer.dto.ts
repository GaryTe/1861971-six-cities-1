import {
  CitiesList,
  PhotosHousing,
  TypeHousinList,
  TypeComfortList,
  User,
  CoordinatesOffer
} from '../../../core/types/index.js';

export default class CreateOfferDto {
  public denomination!: string;
  public descriptionOffer!: string;
  public datePublication!: string;
  public city!: CitiesList;
  public previewImage!: string;
  public photosHousing!: PhotosHousing;
  public premium!: boolean;
  public favorites!: boolean;
  public typeHousing!: TypeHousinList;
  public numberRooms!: number;
  public numberGuests!: number;
  public rentPrice!: number;
  public comforts!: TypeComfortList[];
  public authorOfOffer!: User;
  public coordinates!: CoordinatesOffer;
}
