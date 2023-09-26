import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  HasMany 
} from 'sequelize-typescript';
import FinancialRecord from './FinancialRecordModel';

@Table({ timestamps: true })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })  
  hashed_password: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true }) 
  email: string;

  @Column({ type: DataType.DATE, allowNull: false })  
  date_joined: Date;

  @HasMany(() => FinancialRecord, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  financialRecords: FinancialRecord[];
}

export default User;
