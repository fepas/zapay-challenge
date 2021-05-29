from flask import Blueprint, jsonify, request
from .service.service import SPService
from .parser.parser import SPParser


debts = Blueprint('debts', __name__, url_prefix='/debts')


@ debts.route("/search", methods=["GET"])
def search():
    debt_option = request.args.get('debt_option', default="all", type=str)
    license_plate = request.args.get('license_plate')
    renavam = request.args.get('renavam')

    if license_plate == None or renavam == None:
        return(jsonify({
            "message": "Placa ou Renavam não informados."
        })), 422  # Unprocessable entity

    service = SPService(
        license_plate=license_plate.upper(),
        renavam=renavam,
        debt_option=debt_option.lower()
    )

    try:
        search_result = service.debt_search()
    except Exception as exc:
        return(jsonify({
            "message": str(exc)
        })), 404

    parser = SPParser(search_result)
    result = parser.parse_data()

    return jsonify(result)
