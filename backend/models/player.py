
from models.person import Person
from models.db import db


class Player(Person): #hereda de persona
    __tablename__ = 'players'

    id_national_teams = db.Column(db.Integer, db.ForeignKey('national_teams.id_national_teams'), nullable=False)
    position = db.Column(db.String(50), nullable=False)
    tshirt_number = db.Column(db.Integer, nullable=False)
    current_club = db.Column(db.String(100), nullable=False)
    goals = db.Column(db.Integer, nullable=False, default=0)
    assists = db.Column(db.Integer, nullable=False, default=0)
    yellow_card = db.Column(db.Integer, nullable=False, default=0)
    red_card = db.Column(db.Integer, nullable=False, default=0)
    is_captain = db.Column(db.Boolean, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    height = db.Column(db.Float, nullable=False)

    def update_stats(self, new_goals, new_assists, new_yellow_card, new_red_card):
        if new_goals>=0:
            self.goals += new_goals
        if new_assists>=0:
            self.assists += new_assists
        if new_yellow_card>=0:
            self.yellow_card += new_yellow_card
        if new_red_card>=0:
            self.red_card += new_red_card