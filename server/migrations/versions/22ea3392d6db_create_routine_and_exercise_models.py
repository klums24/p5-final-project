"""Create Routine and Exercise models

Revision ID: 22ea3392d6db
Revises: 7d3dbb68e3fd
Create Date: 2023-07-07 08:47:09.455683

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '22ea3392d6db'
down_revision = '7d3dbb68e3fd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('exercises',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('reps', sa.Integer(), nullable=True),
    sa.Column('duration', sa.Integer(), nullable=True),
    sa.Column('difficulty', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('routines',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('workout_id', sa.Integer(), nullable=True),
    sa.Column('exercise_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercises.id'], name=op.f('fk_routines_exercise_id_exercises')),
    sa.ForeignKeyConstraint(['workout_id'], ['workouts.id'], name=op.f('fk_routines_workout_id_workouts')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('routines')
    op.drop_table('exercises')
    # ### end Alembic commands ###