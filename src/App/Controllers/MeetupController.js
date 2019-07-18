import * as Yup from 'yup'
import { isBefore, parseISO } from 'date-fns'
// import User from '../Models/User'
import Meetup from '../Models/Meetup'

class MeetupController {
  async index (req, res) { }

  async store (req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      time: Yup.date().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' })
    }

    const { title, description, location, time, imageId } = req.body

    const parsedDate = parseISO(time)

    if (await isBefore(parsedDate, new Date())) {
      return res.status(401).json({ error: 'you cannot create meetup for pasted dates' })
    }

    try {
      const resp = await Meetup.create({
        title,
        description,
        location,
        time,
        user_id: req.userId,
        image_id: imageId
      })

      return res.json(resp)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'internal server error' })
    }
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      title: Yup.string(),
      description: Yup.string(),
      time: Yup.date().required(),
      atualDate: Yup.date()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'validation error' })
    }

    const { id, atualDate } = req.body

    const usr = await Meetup.findOne({ where: { id, user_id: req.userId } })

    if (!usr) {
      return res.status(400).json({ error: 'this user dont have any meetup stored' })
    }

    const parsedDate = parseISO(atualDate)

    if (isBefore(parsedDate, new Date())) {
      return res.status(401).json({ error: `you can't modify pasted meetups` })
    }

    try {
      const resp = await Meetup.update(req.body)
      return res.json(resp)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'internal server error' })
    }
  }
}

export default new MeetupController()
