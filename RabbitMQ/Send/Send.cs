using System.Text;
using RabbitMQ.Client;
using Send;

using (var context = new AppDbContext())
{

    var tasks = context.Tasks.Where(t => t.DueDate <= DateTime.Now).ToList();

    if(tasks.Count > 0)
    {
        var factory = new ConnectionFactory { HostName = "localhost" };
        using var connection = factory.CreateConnection();
        using var channel = connection.CreateModel();

        channel.QueueDeclare(queue: "task",
                             durable: false,
                             exclusive: false,
                             autoDelete: false,
                             arguments: null);

        string message = "";

        foreach (var item in tasks)
        {
            message = string.Format("Hi your Task is due. TaskId: {0} Title: {1} Description: {2}",item.Id,item.Title,item.Description);
            var body = Encoding.UTF8.GetBytes(message);

            channel.BasicPublish(exchange: string.Empty,
                                 routingKey: "task",
                                 basicProperties: null,
                                 body: body);
            Console.WriteLine($" [x] Sent {message}");
        }
        
    }

    Console.WriteLine(" Press [enter] to exit.");
    Console.ReadLine();
}