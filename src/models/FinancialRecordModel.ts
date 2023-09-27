import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  ForeignKey, 
  BelongsTo 
} from 'sequelize-typescript';
import UserModel from './UserModel';
import { Sequelize } from 'sequelize';

@Table({ timestamps: true })
export class FinancialRecord extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, allowNull: false })
  user_id: string;

  @Column({ type: DataType.ENUM('income', 'expense'), allowNull: false })
  type: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  amount: number;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')  })
  record_date: Date;

  @BelongsTo(() => UserModel)
  user: UserModel;
}

export default FinancialRecord;
