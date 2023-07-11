"""modify start and end time to be a string in Workout

Revision ID: aa37542237e7
Revises: 22ea3392d6db
Create Date: 2023-07-07 09:57:48.618475

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aa37542237e7'
down_revision = '22ea3392d6db'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('workouts', schema=None) as batch_op:
        batch_op.alter_column('start_time',
               existing_type=sa.TIME(),
               type_=sa.String(),
               existing_nullable=False)
        batch_op.alter_column('end_time',
               existing_type=sa.TIME(),
               type_=sa.String(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('workouts', schema=None) as batch_op:
        batch_op.alter_column('end_time',
               existing_type=sa.String(),
               type_=sa.TIME(),
               existing_nullable=False)
        batch_op.alter_column('start_time',
               existing_type=sa.String(),
               type_=sa.TIME(),
               existing_nullable=False)

    # ### end Alembic commands ###
